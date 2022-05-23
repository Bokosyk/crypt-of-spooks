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
        text: 'The night is Halloween. Instead of trick or treating or the egging of unsuspecting neighbors houses, you find yourself lying flat on your back inside of a cave. Your vision is slightly blurred as you awaken, your mind dazed. The floor is cold and damp. The echoes of splashing water can be heard several feet from you as droplets fall into scattered puddles across the room from great stalactites hanging high above your head. Some fall on your face as you lie there staring up at the ceiling.  You feel funny however... Raising a hand in front of your face, you can scarcely make out the contour of your fingers. They appear different somehow... thinner.',
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
        text: 'You stand up. As your sight improves, you soon realize that what you thought was your emaciated and scrawny hand is, in fact, just your exposed bone. Additionally, you can\'t seem to make out a hint of there being ANY skin left on your hand. In lieu of this newfound discovery, you decide to comment on your current physical state:',
        options: [
            {
                text: '"Heh... cool."',
                nextText: 3
            },
            {
                text: '*Faints*',
                nextText: 3
            },
            {
                text: '"I need to see a doctor."',
                nextText: 3
            },
            {
                text: '"That\'s a serious case of carpal tunnel."',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        img: 'Assets/Day1-Ring.jpg',
        text: 'You faint like a wimp. Your vision is slightly blurred as you awaken again after some time, your head dazed after your sudden fall. The floor is cold and damp. You feel a sense of deja vu as you lay there staring up at the cieling of the cave again.  You feel funny however... Raising a hand in front of your face, you can scarcely make out the contour of your fingers. They appear different somehow... thinner.',
        options: [
            {
                text: 'Continue',
                nextText: 2
            }
        ]
    },
    {
        id: 15,
        img: 'Assets/Day1-Ring.jpg',
        text: '**WORK IN PROGRESS** With no time to lose, you bolt towards the metal door up the path, the light of your torch guiding your steps and preventing you from falling headfirst into the cold, murky water. At this point, the basin begins to stir, the waters growing more chaotic and from the depths of the waters emerge a scaly, slithering sea serpent with its focus fixated on you and your torchlight. It hisses at you, preparing to strike and without bothering to look behind you, you swing open the door and slam it shut just in time, locking it. A loud thud shakes the door violently and an enraged serpent thrashes about at the other side of the door, angered at having let its meal escape. With a sigh of relief, you thank your lucky stars and continue on, never stopping for fear of being discovered again. Eventually, you reach the end of the tunnel and find a small lever in the stone. Pulling it, a slab of rock moves away from you, revealing a secret entrance to some sort of catacomb. Ahead is an arched door surrounded by burnt corpses and a room where weeping can be heard',
        options: [
            {
                text: 'Start Over',
                nextText: -1
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