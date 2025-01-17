let obj = {};

// Yangi objectni qo'shish
obj.childObject = {
  key1: "value1",
  key2: "value2",
};
console.log(obj);
// { childObject: { key1: "value1", key2: "value2" } }

// Keyinchalik child objectga yangi key-value qo'shish
obj.childObject.key3 = "value3";
console.log(obj);
// { childObject: { key1: "value1", key2: "value2", key3: "value3" } }
