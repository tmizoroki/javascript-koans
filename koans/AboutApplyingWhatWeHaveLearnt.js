var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function (product) {
        return product.containsNuts === false && _(product.ingredients).all(function(ingredient) {
          return ingredient !== 'mushrooms';
        });
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _(_.range(1,1000)).chain()
      .filter(function (int) {return int % 3 === 0 || int % 5 ===0})
      .reduce(function (total, int) {
        return total + int;
      }, 0)
      .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    
    var ingredientCount = _(products).chain()
      .map(function (product) {return product.ingredients;})
      .flatten()
      .reduce(function (total, ingredient) {
        total[ingredient] = (total[ingredient] || 0) + 1;
        return total;
      }, {})
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var prime_sieve = function(max) {
      var primes = [];
      var possible = _.range(max);
      possible[0] = undefined;
      possible[1] = undefined;
      for (var i = 2; i < possible.length; i++) {
        for (var j = i; j < possible.length; j += i) {
          if(j !== i) {
           possible[j] = undefined;
          }
        }
      }
      possible.forEach(function(item) {
        if (item) {
          primes.push(item);
        }
      });
      return primes;
    };
    var primeFactor = function(composite) {
      if (composite < 2) {
        return undefined;
      }

      return prime_sieve(composite / 2 + 1).reduce(function(memo, prime) {
        if (composite % prime === 0 && prime > memo) {
          return prime;
        } else {
          return memo;
        }
      }, 0);
    };
    expect(primeFactor(226)).toBe(113);
    expect(primeFactor(1000)).toBe(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var palindromes = [];

    var isPalindrome = function(num) {
      var strNum = String(num);
      var checkLen = Math.floor((strNum.length / 2));
      var firstHalf = strNum.slice(0,checkLen);
      var lastHalf = strNum.slice(-checkLen);
      return firstHalf === lastHalf.split('').reverse().join('');
    };

    var jLowerLimit = 100;

    for (var i = 999; i > 100; i--) {
      for (var j = 999; j > jLowerLimit; j--) {
        if (isPalindrome(i * j)) {
          palindromes.push(i * j);
          jLowerLimit = j;
        }
      }
    }

    var largestPalindrome = Math.max.apply(null, palindromes);
    
    expect(largestPalindrome).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var findSmallest = function() {
      var nextNum = 1;
      var incrementor = 0;
      var result;
      var i = 1;

      while (i <= 20) {
        if (nextNum % i === 0) {
          i++;
          result = nextNum;
        } else {
          nextNum += result;
        }
      }

      return result;
    };

    expect(findSmallest()).toBe(232792560);
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var difference = function(num) {

      var sumOfSquares = function() {
        return _.range(1,num + 1).map(function(item){
          return item * item;
        }).reduce(function(total, current) {
          return total + current;
        });
      };

      var squareOfSums = function() {
        var sum = _.range(1, num + 1).reduce(function(total, current) {
          return total + current;
        });
        return sum * sum;
      };
      return squareOfSums() - sumOfSquares();
    };

    expect(difference(3)).toBe(22);
  });

  it("should find the 10001st prime", function () {
    var prime_sieve = function(max) {
      var primes = [];
      var possible = _.range(max);
      possible[0] = undefined;
      possible[1] = undefined;
      for (var i = 2; i < possible.length; i++) {
        for (var j = i; j < possible.length; j += i) {
          if(j !== i) {
           possible[j] = undefined;
          }
        }
      }
      possible.forEach(function(item) {
        if (item) {
          primes.push(item);
        }
      });
      return primes;
    };

    var primeList = prime_sieve(200000);

    var result = primeList[10001 - 1];

    expect(result).toBe(104743);
  });

});
