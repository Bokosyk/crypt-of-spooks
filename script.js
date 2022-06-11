// Dependencies
const intro = document.getElementById('controls')
const track = document.getElementById('track')
const toggleMusic = document.getElementById('music')
const toggleSwitch =document.querySelector('input[type="checkbox"]')
const startButton = document.getElementById('start-btn')
const container = document.getElementById('mainCont')
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const textImage = document.getElementById('image')

let state = {}

function hide(item) {
    item.setAttribute('hidden', true)
}

function show(item) {
    item.removeAttribute('hidden')
}

// Event Listeners
toggleSwitch.addEventListener('change', switchTheme)
toggleMusic.addEventListener('click', playMusic)
startButton.addEventListener('click', startGame)

// Switch Theme Dynamically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
}

function playMusic() {

    const playList = {
        audios: [
            {
                id: 'phantasmagorie',
                name: 'Phantasmagorie',
                file: 'Assets/audio/Halloween Party 2014 - Phantasmagorie - HQ.mp3',
                isPlaying: false
            },
            {
                id: 'halloween',
                name: 'Halloween',
                file: 'Assets/audio/Halloween.mp3',
                isPlaying: false
            }
        ]
    }

    //Make audio reliant on textNodes WIP
    track.src = playList.audios[1].file

    if (toggleMusic.innerHTML == `<i class="material-icons md-48">volume_up</i>`) {
        track.pause()
        toggleMusic.innerHTML = `<i class="material-icons md-48">volume_off</i>`
    }
    else if (toggleMusic.innerHTML == `<i class="material-icons md-48">volume_off</i>`) {
        track.play()
        track.loop = true
        toggleMusic.innerHTML = `<i class="material-icons md-48">volume_up</i>`

    }
}


function startGame() {
    hide(intro)
    show(container)
    playMusic()
    container.classList.add('display:flex')
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

// SCENES
const textNodes = [
    {
        id: 1,
        img: 'Assets/images/Day1-Ring.jpg',
        name: "gamestart",
        sound: "",
        text: 'The night is Halloween. \n \n Instead of trick or treating or egging unsuspecting neighbors houses, you find yourself lying flat on your back inside of a cave. Your vision is slightly blurred as you awaken, your mind dazed. The floor is cold and damp. The echoes of splashing water can be heard several feet from you as droplets fall into scattered puddles across the room from great stalactites hanging high above your head. Some fall on your face as you lie there staring up at the ceiling, the light of the full moon shining down upon you through an opening in the rocks. You feel funny however... Raising a hand in front of your face, you can scarcely make out the contour of your fingers in your dazed state. They appear different somehow... thinner.',
        options: [
            {
                text: 'CONTINUE',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        img: 'Assets/DE5004BL03W (1).jpg',
        name: "gamestart",
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
        name: "gamestart",
        text: 'You faint like a wimp. Your vision is slightly blurred as you awaken again after some time, your head dazed after your sudden fall. The floor is cold and damp. You feel a sense of deja vu as you lay there staring up at the cieling of the cave again.  You feel funny however... Raising a hand in front of your face, you can scarcely make out the contour of your fingers in your dazed state. They appear different somehow... thinner.',
        options: [
            {
                text: 'CONTINUE',
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        img: 'Assets/Day1-Ring.jpg',
        name: "gamestart",
        text: 'The fog in your mind clears the longer you are awake and as you become acutely aware of your senses- or rather, the lack of them. Apart from sight and sound, you notice your nostrils register no smell, your body no feeling of warmth or cold, hunger or discomfort. It would appear your skeletal hand has affected you more than you had thought... and without answers, you begin to fear something terrible has happened to you. Instinctively, you move towards a puddle on the ground. \n \n In your reflection, clear as day, you find a corpse staring back at you. The macabre grin of a skeleton, illuminated by the moonlight.',
        options: [
            {
                text: 'CONTINUE',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        img: 'Assets/Day1-Ring.jpg',
        name: "gamestart",
        text: '"This is no longer humerus."\n \n  With that, you walk away from the puddle and begin to look for an exit. It is here your adventure begins.',
        options: [
            {
                text: 'CONTINUE',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        img: 'Assets/Day1-Ring.jpg',
        name: "gamestart",
        text: 'Ahead of you is a crossroads. To your left lies a path extending further down into the cave. To your right is a similar looking tunnel, save for a small stream of water that flows steadily in that direction. An unidentifiable object lies on the fork of the path a few feet from you.',
        options: [
            {
                text: 'TURN LEFT',
                nextText: 7
            },
            {
                text: 'TURN RIGHT',
                nextText: 8
            },
            {
                text: 'EXAMINE OBJECT',
                nextText: 9
            },
        ]
    },
    {
        id: 7,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: 'You traverse this path for some time, clumsily walking and stumbling in the darkness. After a while, a faint light floods the room and the roof of the cave rises. A small wooden shack comes into view, illuminated by a dozen lanterns spread evenly about the area. A cloaked figure sits outside, rocking on a chair with a book propped onto their lap. The lanterns do little to illuminate the strangers face, but you are sure they have noticed you.',
        options: [
            {
                text: 'APPROACH STRANGER',
                nextText: 11
            },
            {
                text: 'CONTINUE',
                nextText: 2
            }
        ]
    },
    {
        id: 8,
        img: 'Assets/Day1-Ring.jpg',
        text: 'You stumble in the dark, following the sound of flowing water as you travel downstream. The roof of the cave rises as you progress and, eventually, the darkness fades as moonlight shines through rocky openings in the ceiling once more. Unsurprisingly, you discover the stream you had been following feeds into an underground lake. By the waters edge is a wooden sign pointing in two directions: along the shore line and one back the way you came.',
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
        text: 'A shiny object catches your eye. It appears to be a coin of some sort, fashioned out of a strange metal in the likeness of a Jack O\' Lantern. With your fingers, you turn it to its side and discover an inscription etched onto the back: "All Hallows Eve, a time to be free". It does not seem to hold any immediate or obvious value to you.',
        options: [
            {
                text: 'TAKE ITEM',
                setState: { coin: true },
                nextText: 10
            },
            {
                text: 'DISCARD',
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
                text: 'TURN LEFT',
                nextText: 7
            },
            {
                text: 'TURN RIGHT',
                nextText: 8
            }
        ]
    },
    // ACHILLES SHACK
    {
        id: 11,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"Well, look at you.." Says the stranger, his voice raspy. He raises his head at your approach and shuts his book, gaping at your skeletal form. "I don\'t usually receive visitors... something about my appearance usually gets under peoples\' skin. But, ah.. you don\'t really have that problem now, do you?" \n \n  The stranger chuckles, lowering his hood. "Good.. some common ground, at least."',
        options: [
            {
                text: '"Who are you?"',
                nextText: 12
            },
            {
                text: '"What happened to your face?"',
                nextText: 13
            },
            {
                text: '"Where am I?"',
                nextText: 14
            },
            {
                text: 'LEAVE',
                nextText: 25
            },
        ]
    },
    {
        id: 15,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: 'Achilles looks up at you expectantly.',
        options: [
            {
                text: '"Who are you?"',
                nextText: 12
            },
            {
                text: '"What happened to your face?"',
                nextText: 13
            },
            {
                text: '"Where am I?"',
                nextText: 14
            },
            {
                text: 'LEAVE',
                nextText: 25
            },
        ]
    },
    {
        id: 12,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"I am Achilles. I live here."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 15
            },
        ]
    },
    {
        id: 13,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"The same thing that happened to you. I died."',
        options: [
            {
                text: '"I\'m not dead."',
                nextText: 17
            },
            {
                text: '"How?"',
                nextText: 22
            },
            {
                text: '"That checks out. Anyways."',
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"Hallows Crypt. An inbetween place between the land of the living and the dead. You came here at a good time actually."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 21
            },
        ]
    },
    {
        id: 17,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"Ah, so I\'m just ugly then, is that it?"',
        options: [
            {
                text: '"That\'s not what I meant..."',
                nextText: 18
            },
            {
                text: '"You\'re beautiful!"',
                nextText: 19
            },
            {
                text: '"You said it."',
                nextText: 20
            }
        ]
    },
    {
        id: 18,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"Ha. Just kidding. I know what you meant. Sorry to burst your bubble, kid, but you\'re dead. Otherwise, you wouldn\'t be here. Which reminds me-"',
        options: [
            {
                text: 'CONTINUE',
                nextText: 14
            }
        ]
    },
    {
        id: 19,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"Don\'t do that. Don\'t give me hope."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 15
            }
        ]
    },
    {
        id: 20,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: 'The skeleton seems to glare at you for a moment. "... I don\'t like you."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 15
            }
        ]
    },
    {
        id: 21,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"With it being Halloween night, the spirits are on the move. That means the portal to the realm of the living remains temporarily open. Goodie for you."',
        options: [
            {
                text: 'Portal',
                nextText: 23
            },
            {
                text: 'Hallows Crypt',
                nextText: 24
            },
            {
                text: '"I had other questions.."',
                nextText: 15
            }
        ]
    },
    {
        id: 22,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: 'Achilles pauses for a moment to consider your question. "It\'s a long story. The short of it is I slipped on some ice while I was out wandering where I shouldn\'t and injured my heel pretty bad. ...Would\'ve been fine had that blizzard not shown up immediately after."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 15
            }
        ]
    },
    {
        id: 23,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"The portal here only activates once a year: every night on Halloween. It\'s usually for the spirits who dwell here, but every so often we get humans unlucky enough to die on Halloween. Usually they go to the other places.. but this night is sacred. To the point some souls such as yourself get caught as they\'re traversing the spiritual realms. In any case, you\'d better hurry if you\'re gonna make it out of here: You don\'t leave now while your soul is still fresh, you\'ll be a permanent resident.. Hallows is packed enough as it is."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 21
            }
        ]
    },
    {
        id: 24,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: '"Hallows Crypt is full of monsters. Some of them can\'t sing karoake to save their un-life, but come Halloween, they all sure love scaring the pants off of humans. Oh... and the bone puns.. yeah, that never gets old."',
        options: [
            {
                text: 'CONTINUE',
                nextText: 21
            }
        ]
    },
    {
        id: 25,
        img: 'Assets/Day1-Ring.jpg',
        name: "achilles",
        text: 'Achilles nods, gesturing towards a cloak hanging over a railing on his front porch. "Before you leave, take that costume with you. Cover yourself as best as you can when you get to the portal. You\'ll have an easier time getting through that way. Or don\'t, see if I care." With that, Achilles pries open his book once more and pays you no more attention.',
        options: [
            {
                text: 'TAKE GHOST COSTUME',
                setState: { costume: true },
                nextText: 26
            },
            {
                text: 'IGNORE',
                nextText: 26
            }

        ]
    },
    {
        id: 26,
        img: 'Assets/Day1-Ring.jpg',
        text: '*WIP*',
        options: [
            {
                text: 'CONTINUE',
                nextText: 21
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