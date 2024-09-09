export function dateAsString(
    date: Date,
    langage: string = "fr-FR",
    options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        weekday: "long",
    },
): string {
    return date.toLocaleDateString(langage, options);
}

export function capitalizeWordsPipe(inputString: string) {
    return inputString
        ? inputString
              .toLowerCase()
              .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())
        : "";
}
