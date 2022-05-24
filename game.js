const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const textImage = document.getElementById('image')
let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    const img = document.createElement('img')

    // Sets inner text to whatever is being displayed in textNodes
    textElement.innerText = textNode.text

    //Assigns image
    img.src = textNode.img

    // Removes options
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    //Removes image
    while (textImage.firstChild) {
        textImage.removeChild(textImage.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)

            //Loads image
            textImage.appendChild(img)
        }
    })
}

function showOption(option) {
    // Checks if we have a required state object (OR)
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    // Restarts game if nextNodeId is less than zero
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    // Takes current state, add everything from options set state to it, and override anything that's already there
    // Returns brand new object to set to our current state
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        img: 'Assets/Day1-Ring.jpg',
        text: 'The night is Halloween. \n \n Instead of trick or treating or the egging of unsuspecting neighbors houses, you find yourself lying flat on your back inside of a cave. Your vision is slightly blurred as you awaken, your mind dazed. The floor is cold and damp. The echoes of splashing water can be heard several feet from you as droplets fall into scattered puddles across the room from great stalactites hanging high above your head. Some fall on your face as you lie there staring up at the ceiling, the light of the full moon shining down upon you through an opening in the rocks. You feel funny however... Raising a hand in front of your face, you can scarcely make out the contour of your fingers in your dazed state. They appear different somehow... thinner.',
        options: [
            {
                text: 'Continue',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        img: 'Assets/DE5004BL03W (1).jpg',
        text: 'You stand up. As your sight improves, you soon realize that what you thought was your emaciated and scrawny hand is, in fact, just your exposed bone. Additionally, you can\'t seem to make out a hint of there being ANY flesh left on your hand. In lieu of this newfound discovery, you decide to comment on your current physical state:',
        options: [
            {
                text: '"Heh... cool."',
                nextText: 4
            },
            {
                text: '*Faints*',
                nextText: 3
            },
            {
                text: '"I need to see a doctor."',
                nextText: 4
            },
            {
                text: '"That\'s a serious case of carpal tunnel."',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        img: 'Assets/Day1-Ring.jpg',
        text: 'You faint like a wimp. Your vision is slightly blurred as you awaken again after some time, your head dazed after your sudden fall. The floor is cold and damp. You feel a sense of deja vu as you lay there staring up at the cieling of the cave again.  You feel funny however... Raising a hand in front of your face, you can scarcely make out the contour of your fingers in your dazed state. They appear different somehow... thinner.',
        options: [
            {
                text: 'Continue',
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        img: 'Assets/Day1-Ring.jpg',
        text: 'The fog in your mind clears the longer you are awake and as you become acutely aware of your senses- or rather, the lack of them. Apart from sight and sound, you notice your nostrils register no smell, your body no feeling of warmth or cold, hunger or discomfort. It would appear your skeletal hand has affected you more than you had thought... and without answers, you begin to fear something terrible has happened to you. Instinctively, you move towards a puddle on the ground. \n \n In your reflection, clear as day, you find a corpse staring back at you. The macabre grin of a skeleton illuminated by the moonlight.',
        options: [
            {
                text: 'Continue',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        img: 'Assets/Day1-Ring.jpg',
        text: '"This is no longer humerus."\n \n  With that, you walk away from the puddle and begin to look for an exit. It is here your adventure begins.',
        options: [
            {
                text: 'Continue',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        img: 'Assets/Day1-Ring.jpg',
        text: 'Ahead of you to your left lies a path extending further down into the cave. To your right is another tunnel, a small stream of water flows steadily in that direction. A small object lies in the center of this crossroads a few feet from you, unidentifiable from this distance.',
        options: [
            {
                text: 'Veer Left',
                nextText: 7
            },
            {
                text: 'Veer Right',
                nextText: 8
            },
            {
                text: 'Examine object closely',
                nextText: 9
            },
        ]
    },
    {
        id: 7,
        img: 'Assets/Day1-Ring.jpg',
        text: 'Text',
        options: [
            {
                text: 'Continue',
                nextText: 2
            }
        ]
    },
    {
        id: 8,
        img: 'Assets/Day1-Ring.jpg',
        text: 'Text',
        options: [
            {
                text: 'Continue',
                nextText: 2
            }
        ]
    },
    {
        id: 9,
        img: 'Assets/Day1-Ring.jpg',
        text: 'A shiny object catches your eye. It appears to be a coin of some sort, fashioned out of a strange metal in the likeness of a Jack O\' Lantern. With your fingers, you turn it to its side and discover an inscription etched onto the back: "All Hallows Eve, a time to be free". It does not seem to hold any obvious value to you.',
        options: [
            {
                text: 'Take item',
                setState: { coin: true },
                nextText: 10
            },
            {
                text: 'Discard',
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        img: 'Assets/Day1-Ring.jpg',
        text: 'Ahead of you to your left lies a path extending further down into the cave. To your right is another tunnel, a small stream of water flows steadily in that direction.',
        options: [
            {
                text: 'Veer Left',
                nextText: 7
            },
            {
                text: 'Veer Right',
                nextText: 8
            }
        ]
    },
    {
        id: 99,
        text: 'You find an item',
        options: [
            {
                text: 'Move forward',
                nextText: 2
            },
            {
                text: 'Take item',
                setState: { item: true },
                nextText: 2
            }
        ]
    },
    {
        id: 100,
        text: 'You venture forth in search of answers to where you are when you come across a merchant',
        options: [
            {
                text: 'Trade the item for a sword',
                // Takes in current state and checks if we have what we need
                requiredState: (currentState) => currentState.item,
                setState: { item: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the item for a shield',
                // Takes in current state and checks if we have what we need
                requiredState: (currentState) => currentState.item,
                setState: { item: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                setState: { item: false, shield: true },
                nextText: 3
            }
        ]
    },
    {
        id: 101,
        text: 'This is the end of the game',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()