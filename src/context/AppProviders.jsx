import { EducationProvider } from '../features/education/context/EducationContext';
import { ProfileProvider } from '../features/profile/context/ProfileContext';
import { AuthProvider } from './../features/authentication/context/AuthContext';
import { CommunityProvider } from './../features/community/context/CommunityContext';


/**
 * Componente que envuelve TODOS los providers de contexto de la app.
 * Así solo importas uno en tu entrypoint y mantienes todo centralizado.
 */
export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <CommunityProvider>
          <EducationProvider>
            
              {children}
            
          </EducationProvider>
        </CommunityProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
