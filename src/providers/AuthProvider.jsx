import PropTypes from 'prop-types';

// Auth is handled locally via Redux. No backend provider needed.
export const AuthProvider = ({ children }) => children;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
