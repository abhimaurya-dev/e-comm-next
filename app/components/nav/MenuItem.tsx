interface MenuItemProps {
  children: React.ReactNode;
  onclick: () => void;
}
const MenuItem: React.FC<MenuItemProps> = ({ children, onclick }) => {
  return (
    <div
      onClick={onclick}
      className="px-4 py-3 transition hover:bg-neutral-100"
    >
      {children}
    </div>
  );
};

export default MenuItem;
