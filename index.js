const {useMemo} = require('react');
const querystring = require('querystring');

module.exports = function useQueryString(location, navigate) {
  return useMemo(
    function() {
      const query = querystring.parse(location.search.slice(1));

      function setQuery(values) {
        const newQuery = Object.assign({}, query, values);
        navigate(location.pathname + '?' + querystring.stringify(newQuery));
      }

      return [query, setQuery];
    },
    [location.pathname, location.search, navigate]
  );
};
