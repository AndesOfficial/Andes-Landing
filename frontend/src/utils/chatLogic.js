/**
 * "Andy" - The Andes Laundry Assistant
 * Handles conversation logic, state management for scheduling, and persona-driven responses.
 */

// Service Areas Mock Data
const SERVICE_AREAS = ['pune', 'baner', 'aundh', 'koregaon park', 'viman nagar', 'wakad', 'hinjewadi', 'magarpatta', 'kalyani nagar', 'kharadi'];

export const getBotResponse = (input, currentState = 'IDLE', userName = 'Friend') => {
    const lowerInput = input.toLowerCase().trim();

    // --- GLOBAL COMMANDS (Always accessible) ---

    // Cancel/Reset
    if (lowerInput === 'back to menu' || lowerInput === 'cancel' || lowerInput.includes('start over')) {
        return {
            text: "No problem! Let's start fresh. How can I help you?",
            options: ['Book Now', 'Check Pricing', 'Service Areas', 'Support'],
            nextState: 'IDLE'
        };
    }

    // --- STATE-BASED LOGIC ---

    switch (currentState) {
        case 'AWAITING_SERVICE_AREA':
            // 1. Check if user selected "Other" or typed it
            if (lowerInput === 'other' || lowerInput.includes('other')) {
                return {
                    text: "No problem! Could you type the name of your area/neighborhood?",
                    options: ['Back to Menu'],
                    nextState: 'CHECKING_CUSTOM_LOCATION'
                };
            }

            // 2. Check if their input matches our list
            const isServicable = SERVICE_AREAS.some(area => lowerInput.includes(area));

            // Stricter check: only say YES if it's in the list or explicitly says "yes" in a confirmation context
            if (isServicable) {
                return {
                    text: "Yes, we do! We're in your neighborhood. Ready to book?",
                    options: ['Book Now', 'Check Pricing'],
                    nextState: 'IDLE'
                };
            }

            // If they just say "yes" (maybe they thought we asked "Do you live in Pune?"), we should probably clarify
            if (lowerInput === 'yes' || lowerInput === 'yeah') {
                return {
                    text: "Great! Which neighborhood exactly?",
                    options: ['Koregaon Park', 'Baner', 'Other'],
                    nextState: 'AWAITING_SERVICE_AREA'
                };
            }

            return {
                text: "I'm checking... It looks like we might not be fully active there yet. Just to be sure, is your location in Pune?",
                options: ['Yes, it is in Pune', 'No, somewhere else'],
                nextState: 'CHECKING_PUNE_CONFIRMATION'
            };

        case 'CHECKING_CUSTOM_LOCATION':
            // User typed their custom location (e.g. "Shivaji Nagar")
            const isKnownArea = SERVICE_AREAS.some(area => lowerInput.includes(area));

            if (isKnownArea || (lowerInput.includes('pune') && !lowerInput.includes('outside') && !lowerInput.includes('no '))) {
                return {
                    text: "Great! That falls within our Pune service zone. Shall we schedule a pickup?",
                    options: ['Book Now', 'Check Pricing', 'Back to Menu'],
                    nextState: 'IDLE'
                };
            } else {
                // We don't recognize it, ASK if it's in Pune
                return {
                    text: "I'm not 100% sure about that specific area yet. Is it located inside Pune?",
                    options: ['Yes, it is in Pune', 'No, outside Pune'],
                    nextState: 'CHECKING_PUNE_CONFIRMATION'
                };
            }

        case 'CHECKING_PUNE_CONFIRMATION':
            // Prioritize NEGATIVE checks first
            if (lowerInput.includes('no') || lowerInput.includes('not') || lowerInput.includes('outside') || lowerInput.includes('cant')) {
                return {
                    text: "Ah, I see. Currently, we exclusively serve Pune. We hope to expand to your city soon!",
                    options: ['Back to Menu'],
                    nextState: 'IDLE'
                };
            }

            if (lowerInput.includes('yes') || lowerInput.includes('pune') || lowerInput.includes('yeah') || lowerInput.includes('sure')) {
                return {
                    text: "Awesome! Since it's in Pune, we likely serve you (or will very soon)! You can go ahead and book.",
                    options: ['Book Now', 'Check Pricing'],
                    nextState: 'IDLE'
                };
            }

            // Fallback for unclear input in this state
            return {
                text: "Ah, I see. Currently, we exclusively serve Pune. We hope to expand to your city soon!",
                options: ['Back to Menu'],
                nextState: 'IDLE'
            };

        // Removed Dead Scheduling States (SCHEDULING_STEP_1, etc.)
    }

    // --- IDLE STATE LOGIC (Standard Menu) ---

    // 1. Onboarding / Greeting Hints
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return {
            text: `Hi! I'm Andy, your laundry assistant. I can help you schedule a pickup, check prices, or track an order. How can I lighten your load today?`,
            options: ['Book Now', 'Check Pricing', 'Service Areas', 'Support'],
            nextState: 'IDLE'
        };
    }

    // 2. Schedule Pickup Flow (Redirect to Services)
    // Catches: schedule, pickup, book, order, wash
    if (lowerInput.includes('schedule') || lowerInput.includes('pickup') || lowerInput.includes('book') || lowerInput.includes('order')) {
        return {
            text: "Let's get you sorted! To schedule a pickup, please select your items on our Services page. I'll take you there now!",
            options: ['Book Now', 'Check Pricing'],
            nextState: 'IDLE'
        };
    }

    // 3. Pricing
    if (lowerInput === 'check pricing' || lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate') || lowerInput.includes('how much')) {
        return {
            text: "Here is our general pricing:\n• Wash: ₹59/kg\n• Wash & Iron: Starts @ ₹79/kg\n• Dry Cleaning: Starts @ ₹139/piece\n• Shoe Cleaning: Starts @ ₹259/pair\nWant the full scoop?",
            options: ['View Full Price List', 'Book Now', 'Back to Menu'],
            nextState: 'IDLE'
        };
    }

    // 4. Service Area
    if (lowerInput.includes('area') || lowerInput.includes('location') || lowerInput.includes('neighborhood') || lowerInput.includes('come to') || lowerInput.includes('cover')) {
        return {
            text: "We serve exclusively in Pune! Which neighborhood are you in?",
            options: ['Koregaon Park', 'Baner', 'Viman Nagar', 'Other'],
            nextState: 'AWAITING_SERVICE_AREA'
        };
    }

    // 5. Track Order
    if (lowerInput.includes('track') || lowerInput.includes('status') || lowerInput.includes('where is')) {
        return {
            text: "To track your order, head over to the 'My Orders' section. I can take you there now!",
            options: ['Go to My Orders', 'Back to Menu'],
            nextState: 'IDLE'
        };
    }

    // 6. Support / Guardrails
    if (lowerInput.includes('support') || lowerInput.includes('human') || lowerInput.includes('help') || lowerInput.includes('complaint') || lowerInput.includes('contact')) {
        return {
            text: "I want to make sure this is handled perfectly. You can reach our human team at:\n📞 +91 86260 76578\n📧 care@andes.co.in",
            options: ['Back to Menu'],
            nextState: 'IDLE'
        };
    }

    // 7. Stains (Guardrail)
    if (lowerInput.includes('stain')) {
        return {
            text: "We're stain-fighting experts! Note: We'll do our absolute best, but we can't guarantee 100% removal for delicate fabrics or old stains. Please mark the stain when you hand over the clothes!",
            options: ['Book Now', 'Back to Menu'],
            nextState: 'IDLE'
        };
    }

    // Default / Fallback
    return {
        text: "I didn't quite catch that. I'm smart, but I'm still learning! Try one of these:",
        options: ['Book Now', 'Check Pricing', 'Support'],
        nextState: 'IDLE'
    };
};

export const createInitialMessage = () => ({
    id: Date.now(),
    text: "Hi! I'm Andy, your laundry assistant. I can help you schedule a pickup, check prices, or track an order. How can I lighten your load today?",
    sender: 'bot',
    options: ['Book Now', 'Check Pricing', 'Service Areas', 'Support']
});
