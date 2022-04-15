const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode()
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Sets inner text to whatever is being displayed in textNodes
    textElement.innerText = textNode.text
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
    }
]

function selectOption(option) {

}

startGame()