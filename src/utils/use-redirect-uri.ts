import { useLocation } from 'react-router-dom';

export function useRedirectUri() {

  const location = useLocation();

  const search = new URLSearchParams(location.search);

  const redirectUri = search.get('redirectUri') as string;

  return {
    redirectUri,
  };
}
