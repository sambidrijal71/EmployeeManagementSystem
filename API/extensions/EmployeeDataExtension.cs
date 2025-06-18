using API.models;

namespace API.extensions
{
    public static class EmployeeDataExtension
    {
        public static IQueryable<Employee> Sort(this IQueryable<Employee> query, string? sortBy)
        {
            if (String.IsNullOrEmpty(sortBy)) return query.OrderBy(f => f.FirstName);
            query = sortBy switch
            {
                "fNam" => query.OrderBy(f => f.FirstName),
                "lName" => query.OrderBy(l => l.LastName),
                "date" => query.OrderBy(d => d.DateOfJoining),
                "fName_desc" => query.OrderByDescending(f => f.FirstName),
                "lName_desc" => query.OrderByDescending(l => l.LastName),
                "date_desc" => query.OrderByDescending(d => d.DateOfJoining),
                _ => query.OrderBy(f => f.FirstName),
            };
            return query;
        }

        public static IQueryable<Employee> Search(this IQueryable<Employee> query, String? searchKey)
        {
            if (String.IsNullOrEmpty(searchKey)) return query;
            var lowerSearchKey = searchKey.ToLower();
            query = query.Where(s =>
            s.FirstName.ToLower().Contains(lowerSearchKey) ||
            s.LastName.ToLower().Contains(lowerSearchKey) ||
            s.Email.ToLower().Contains(lowerSearchKey));
            return query;
        }
    }
}