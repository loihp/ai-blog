const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid place-items-center">
      {children}
    </div>
   );
}

export default AuthLayout;