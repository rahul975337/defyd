// #region live coding
/**
 * class Node{
    value:string;
    next:Node
    constructor(val,next){
        this.value = val
        this.next = next;
    }
}
// prev
// 1 -> 2 -> 3
// output

// curr = 1


//background fetch
// linked list task
// splashscreen => mock time

function reverse(head:Node){
    const reversed:Node=null;
    const curr:Node = head;
    const next:Node = head.next;

   while(curr != null){}
    return
}


function printReverse(head:Node){
  const curr:Node = head;
  if(curr === null) return
  printReverse(curr.next)
  console.log(curr.value)
}

const head:Node =...
printReverse(head)
 */
// #endregion

// #region refactor

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(val: T, next: ListNode<T> | null) {
    this.value = val;
    this.next = next;
  }
}

type ListNodeType<T> = ListNode<T> | null;

function createLinkedList<T>(arr: T[]) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0], null);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i], null);
    curr = curr.next;
  }
  return head;
}

function printLinkedList<T>(head: ListNodeType<T>) {
  let curr: ListNodeType<T> = head;
  while (curr !== null) {
    console.log(curr.value);
    curr = curr.next;
  }
}

function reverse<T>(head: ListNodeType<T>) {
  let prev: ListNodeType<T> = null;
  let curr: ListNodeType<T> = head;
  let next: ListNodeType<T> = null;
  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

function printReverseRecursive<T>(head: ListNodeType<T>) {
  if (head === null) return;
  printReverseRecursive(head.next);
  console.log(head.value);
}

// #endregion
