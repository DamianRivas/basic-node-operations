function reverseString(inputString) {
  return inputString
    .split("")
    .reverse()
    .join("");
}

console.log(reverseString("Hello world"));
