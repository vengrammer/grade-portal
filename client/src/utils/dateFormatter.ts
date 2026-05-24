
export const dateFormatter = (date: string): string => {
    if (!date) return "";

    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
        return "Invalid Date";
    }

    return formattedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};