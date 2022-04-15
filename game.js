const textElement = document.getElementById('story')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Sets inner text to whatever is being displayed in textNodes
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
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
        id: 2
    }
]

function selectOption(option) {

}

startGame()