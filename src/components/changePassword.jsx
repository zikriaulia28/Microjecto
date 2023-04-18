function ChangePassword() {
  return (
    <div className="flex flex-col p-8 w-[53.125rem] h-[42.375rem] bg-white rounded-xl shadow-lg">
      <h1 className="font-bold text-lg">Change Password</h1>
      <p className="w-[21.375rem] text-font-primary-blur mt-6">
        You must enter your current password and then type your new password
        twice.
      </p>
    </div>
  );
}

export default ChangePassword;
