namespace Calendify.Server.Services
{
    public static class Helper
    {
        public static bool FieldsAreNull<T>(T obj)
        {
            if (obj == null) return true;

            return typeof(T).GetProperties()
                            .Any(prop => prop.GetValue(obj) == null);
        }
    }
}
