global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        "name": "Harry Potter",
        "species": "human",
        "gender": "male",
        "house": "Gryffindor",
        "dateOfBirth": "31-07-1980",
        "yearOfBirth": 1980,
        "ancestry": "half-blood",
        "eyeColour": "green",
        "hairColour": "black",
        "wand": {
          "wood": "holly",
          "core": "phoenix feather",
          "length": 11
        },
        "patronus": "stag",
        "hogwartsStudent": true,
        "hogwartsStaff": false,
        "actor": "Daniel Radcliffe",
        "alive": true,
        "image": "http://hp-api.herokuapp.com/images/harry.jpg"
      }
    ]),
  })
);

test('fetches characters from API', async () => {
  const response = await fetch('http://localhost:4000/characters');
  const data = await response.json();

  // Verifica que fetch haya sido llamado con la URL correcta
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/characters');

  // Verifica que los datos obtenidos sean correctos
  expect(data).toEqual([
    {
      "name": "Harry Potter",
      "species": "human",
      "gender": "male",
      "house": "Gryffindor",
      "dateOfBirth": "31-07-1980",
      "yearOfBirth": 1980,
      "ancestry": "half-blood",
      "eyeColour": "green",
      "hairColour": "black",
      "wand": {
        "wood": "holly",
        "core": "phoenix feather",
        "length": 11
      },
      "patronus": "stag",
      "hogwartsStudent": true,
      "hogwartsStaff": false,
      "actor": "Daniel Radcliffe",
      "alive": true,
      "image": "http://hp-api.herokuapp.com/images/harry.jpg"
    }
  ]);
});
