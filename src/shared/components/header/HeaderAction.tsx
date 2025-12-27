import GuestActions from '@/shared/components/header/GuestAction';
import LoggedInActions from '@/shared/components/header/LoggedInActions';
import { User } from '@/shared/types/user';

interface HeaderActionsProps {
  isLoggedIn: boolean;
  user?: User;
  nickname?: string;
}

export default function HeaderActions({ isLoggedIn, user, nickname }: HeaderActionsProps) {
  if (isLoggedIn && user) {
    return <LoggedInActions user={user} nickname={nickname} />;
  }

  return <GuestActions />;
}
