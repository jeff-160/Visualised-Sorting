// bubble sort 
async function BubbleSort(array){
    let n = array.length
    for (let i=0;i<n;i++){
        swapped = false
        for (let j=0;j<n-i-1;j++){
            if (array[j]>array[j+1]){
                PlayNote(array[j])
                States.Set(array[j], array[j+1])
                ;[array[j], array[j+1]] = [array[j+1], array[j]]
                swapped = true
            }
            await Delay()
        }
        if (!swapped) 
            break;
    }

    EndAnim()
}

// insertion sort
async function InsertSort(array){
    for (let i=1;i<array.length;i++){
        let key = array[i]
        let j = i-1
        while (j>=0 && key<array[j]){
            PlayNote(array[j+1])
            States.Set(array[j+1], array[j])
            array[j+1] = array[j]
            j-=1
            await Delay()
        }
        array[j+1] = key
    }

    EndAnim()
}


// quick sort
async function Partition(array, low, high){
    let pivot = array[high]
    let i = low-1
    for (let j=low;j<high;j++){
        if (array[j]<=pivot){
            i = i+1;
            PlayNote(array[j])
            States.Set(array[i], array[j])
            ;[array[i], array[j]] = [array[j], array[i]];
        }
        await Delay()
    }
    [array[i+1], array[high]] = [array[high], array[i+1]];
    return i+1
}

async function QuickSort(array, low, high){
    if ([low, high].every(i=>i==undefined)) 
        [low, high] = [0, array.length-1]

    if (low<high){
        let pi = await Partition(array, low, high)
        await QuickSort(array, low, pi-1)
        await QuickSort(array, pi+1, high)
    }

    if (!low && high==array.length-1)
        EndAnim()
}

// merge sort
async function Merge(array, left, mid, right) {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    
    let i = j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]){
            array[k++] = leftArray[i++]; 
            States.Set(array[k], leftArray[i])
        }
        else {
            array[k++] = rightArray[j++];
            States.Set(array[k], rightArray[j])
        }

        PlayNote(array[k])
        
        await Delay()
    }

    while (i < leftArray.length)
        array[k++] = leftArray[i++];

    while (j < rightArray.length)
        array[k++] = rightArray[j++];
}

async function MergeSort(array, left = 0, right = array.length - 1) {
    if (left >= right)
        return;

    const mid = Math.floor((left + right) / 2);
    
    await MergeSort(array, left, mid);
    await MergeSort(array, mid + 1, right);
    await Merge(array, left, mid, right);

    if (!left && right==array.length-1)
        EndAnim()
}


Delay =()=> Sleep(1)

class SortItem{
    constructor(name, callback){
        this.Name = name
        this.Callback = callback
    }
}

const Sorts = [
    new SortItem("Bubble Sort", BubbleSort),
    new SortItem("Insertion Sort", InsertSort),
    new SortItem("Quick Sort", QuickSort),
    new SortItem("Merge Sort", MergeSort)
]