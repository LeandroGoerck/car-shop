const carId =  "4edd40c86762e0fb12000003"

const carBody = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
 }

const oneCar = {
  "_id": "4edd40c86762e0fb12000003",
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
 }

 const carBodyWithMissingField = {
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
 }

 const allCars = [
  {
      "_id": "62cca1a5d36b73fe5250c4e9",
      "model": "Ferrari Maranello2",
      "year": 1963,
      "color": "red",
      "buyValue": 3500000,
      "doorsQty": 2,
      "seatsQty": 2
  },
  {
      "_id": "4edd40c86762e0fb12000003",
      "model": "Ferrari Maranello",
      "year": 1963,
      "color": "red",
      "buyValue": 3500000,
      "doorsQty": 2,
      "seatsQty": 2
  }
]

 export default {
  carId,
  carBody,
  oneCar,
  carBodyWithMissingField,
  allCars,
}