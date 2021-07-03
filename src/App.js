import HeaderSection from "./components/HeaderSection";
import BasicForm from "./components/BasicForm";
function App() {
  async function onSubmitDataValue(formdata) {
    const response = await fetch(
      "https://react-form-data-c9fa5-default-rtdb.firebaseio.com/fdata.json",
      {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <HeaderSection />
      <BasicForm onSubmitData={onSubmitDataValue} />
    </div>
  );
}

export default App;
