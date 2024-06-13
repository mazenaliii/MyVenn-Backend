# Encrypt it mega

```js
encrypt("Hello" , "secretKey")
// {
// type: 'object',
// iv: '28f56c0a37b37457edc30f084bbf8a3b',
// ciphertext: 'U2FsdGVkX19Nx7k7NPDn65bEcBmTm//ryFumL2/1lCrygwk8Y9dr7Z921OySnt9V'
//}

decrypt({
  type: 'object',
  iv: '28f56c0a37b37457edc30f084bbf8a3b',
  ciphertext: 'U2FsdGVkX19Nx7k7NPDn65bEcBmTm//ryFumL2/1lCrygwk8Y9dr7Z921OySnt9V'
})
//"Hello"
```
