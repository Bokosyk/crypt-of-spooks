const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Sets inner text to whatever is being displayed in textNodes
    textElement.innerText = textNode.text
    // Removes options
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return true
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and ahead of you lies a path.',
        options: [
            {
                text: 'Move forward',
                nextText: 2
            },
            {
                text: 'Take item',
                setState: { item: true },
                nextText: 2
            },
            {
                text: 'Move right',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant',
        options: [
            {
                text: 'Trade the item for a sword',
                // Takes in current state and checks if we have what we need
                requiredState: (currentState) => currentState.item,
                setState: {item: false, sword: true},
                nextText: 3
            },
            {
                text: 'Trade the item for a shield',
                // Takes in current state and checks if we have what we need
                requiredState: (currentState) => currentState.item,
                setState: {item: false, shield: true},
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                setState: {item: false, shield: true},
                nextText: 3
            }
        ]
    }
]

function selectOption(option) {

}

startGame()