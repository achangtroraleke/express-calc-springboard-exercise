const ExpressError = require('./expressError');

class Calculator{
    constructor(operation, nums){
        this.operation = operation
        this.nums = nums.split(',');
        this.response = {'operation':this.operation, 'value':null}
    }

    checkNums(){
        let regex = /^[a-zA-Z]+/;
        console.log(this.nums)
        for(const num of this.nums){
            if(regex.test(num)){
          
                throw new ExpressError(`${num} not a number.`, 400)
            }
        }
        return true
    }

    mean() {
        this.checkNums();
        let result = this.nums.reduce((a,b)=>parseInt(a)+parseInt(b))/ this.nums.length;
        this.response['value'] = result
    }

    median(){
        this.checkNums();
        if(this.nums.length % 2 === 0){
            let num1idx = this.nums.length/2;
            let num1 = this.nums[num1idx];
            let num2 = this.nums[num1idx - 1];
            let result = (parseInt(num1) + parseInt(num2))/2;
            this.response['value'] = result;
        }else{
            let index = Math.floor(this.nums.length/2);
            this.response['value'] = this.nums[index]
        }
    }

    mode(){
        this.checkNums();
        let bestStreak = 1;
        let bestNum = this.nums[0]
        let currStreak = 1;
        let currNum = this.nums[0];
        for(let i = 0; i < this.nums.length; i ++){
            if(this.nums[i] === currNum){
                currStreak ++;
            }else{
                if(currStreak > bestStreak){
                    bestNum = this.nums[i];
                    bestStreak = currStreak;
                }else{
                    currNum = this.nums[i];
                    currStreak = 0
                }
                
            }
        }
        this.response['value']  = currNum;
    }

    formatResponse(){
     
        return `response: ${this.response}`
    }
}

module.exports = Calculator