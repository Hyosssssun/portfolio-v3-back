import './App.css';

function App() {
  return (
    <h1
      className='App'
      onClick={async () => {
        const test = await fetch('http://localhost:8080/products/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stock_number: '16666',
            name: '1666',
            Description: '1666',
            Price: '£92',
          }),
          // encodeBodyAsJSON: true,
        });
        const response = await test.json();
        console.log(response.body);
        return response.body;
      }}
    >
      Click me
    </h1>
  );
}

export default App;
