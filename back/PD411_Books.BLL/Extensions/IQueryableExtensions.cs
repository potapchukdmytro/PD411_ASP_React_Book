using System.Linq.Expressions;

namespace PD411_Books.BLL.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> OrderByProperty<T>(this IQueryable<T> source, string propertyName, bool desc = false)
        {
            var parameter = Expression.Parameter(typeof(T), "x");

            MemberExpression? property = null;

            try
            {
                property = Expression.Property(parameter, propertyName);
            }
            catch (Exception)
            {
                property = Expression.Property(parameter, "Id");
            }

            var lambda = Expression.Lambda(property, parameter);

            var methodName = desc ? "OrderByDescending" : "OrderBy";

            var method = typeof(Queryable)
                .GetMethods()
                .First(m => m.Name == methodName)
                .MakeGenericMethod(typeof(T), property.Type);

            return (IQueryable<T>)method.Invoke(null, [source, lambda])!;

        }
    }
}
