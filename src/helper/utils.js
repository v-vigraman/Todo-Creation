export const removeObjectByValue = function(arr, value){
    var i = arr.length;
    while(i--){
       if( arr[i].key === value ){ 
           arr.splice(i,1);
       }
    }
    return arr;
}