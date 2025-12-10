import { UserButton } from "./auth/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex justify-between items-center">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitor all of your projects and tasks here
        </p>
      </div>
      {/* the mobile sidebar is lg:hidden, which is the opposite of the above div so they will replace each other on the "lg" screen size */}
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
