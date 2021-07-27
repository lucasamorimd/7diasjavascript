
let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver)
    area.addEventListener('dragleave', dragLeave)
    area.addEventListener('drop', drop)
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)
// Functions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging')
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging')
}

// Functions Area
function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover')
    }
    //console.log('Passou por cima')
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover')
    //console.log('Saiu da área dropavel')
}
function drop(e) {
    e.currentTarget.classList.remove('hover')

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging')
        e.currentTarget.appendChild(dragItem)
        updateAreas();
    }

    //console.log('Dropou')
}

// Functions Neutral Area

function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover')
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover')
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover')

    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)
    updateAreas();
}


// Logic functions

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');
        if (area.querySelector('.item')) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    })
    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')

    }
}