import { set } from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";

function TransferToUser({ isShow, onClose }, props) {
  // console.log(props);
  const balance = useSelector((state) => state.user.data.balance);
  const [isInvalid, setInvalid] = useState(false);
  const [msgInvalid, setMsgInvalid] = useState("Input over balance, ");
  const [amount, setAmount] = useState(props.amount || "");
  const [notes, setNotes] = useState(props.note || "");
  const [input, setInput] = useState(false);

  const onChangeAmount = (event) => {
    const { value } = event.target;
    if (value > 0) {
      setInput(true);
    } else {
      setInput(false);
    }
    const regex = /^[0-9]+$/;
    if (regex.test(value) || value === "") {
      setInvalid(false);
      setAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amount > balance) return setInvalid(true);
    const data = { amount, notes: notes || "" };
    // console.log(data);
    onClose(data);
  };

  return (
    <>
      {isShow && (
        <form
          action=""
          className="w-full flex flex-col justify-center items-center"
        >
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={onChangeAmount}
            className="my-7 focus:outline-none text-4xl text-center font-bold w-full md:w-auto"
            placeholder="Rp. 0,-"
          />
          <p
            className={`font-bold ${
              isInvalid && "text-secondary"
            } transition-all text-center`}
          >
            {isInvalid && msgInvalid}
            Rp. {balance.toLocaleString("id-ID")} Availabel
          </p>
          <label
            htmlFor="phone"
            className="label-input my-5 font-bold text-xl px-2"
          >
            <div className="flex gap-4 border-b pb-2">
              <i className="icon-input bi bi-pencil text-grey"></i>
              <input
                type="text"
                id="note"
                name="note"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add some notes"
                className="w-full font-medium focus:outline-none"
              />
            </div>
          </label>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isInvalid || amount < 1 || amount === ""}
            className={`mt-5 py-2 rounded-xl ${
              input ? "text-white bg-primary" : "bg-secondary"
            } outline-none  w-full md:w-80`}
          >
            Continue
          </button>
        </form>
      )}
    </>
  );
}

export default TransferToUser;
