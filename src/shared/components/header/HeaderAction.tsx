import GuestActions from '@/shared/components/header/GuestAction';
import LoggedInActions from '@/shared/components/header/LoggedInActions';
import { User } from '@/shared/types/user.type';

interface HeaderActionsProps {
  isLoggedIn: boolean;
  user?: User;
}

export default function HeaderActions({ isLoggedIn, user }: HeaderActionsProps) {
  if (isLoggedIn && user) {
    return <LoggedInActions user={user} />;
  }

  return <GuestActions />;
}
