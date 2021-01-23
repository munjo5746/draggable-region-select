import "./styles.css";

export default function App() {
  return (
    <div className="App">
      {[...Array(10).keys()].map(() => {
        return <div></div>;
      })}
    </div>
  );
}
