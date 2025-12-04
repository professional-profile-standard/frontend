export function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
export function renderLocation(location) {
    if (!location) return "";
    if (typeof location === "string") return location;
    if (typeof location !== "object") return String(location);

    const parts = [];

    if (location.latitude) parts.push(location.latitude);
    if (location.longitude) parts.push(location.longitude);
    if (location.address) parts.push(location.address);
    if (location.street) parts.push(location.street);

    if (location.village) parts.push(location.village);
    if (location.city) parts.push(location.city);

    if (location.state) parts.push(location.state);
    if (location.postal_code) parts.push(location.postal_code);
    if (location.country) parts.push(location.country);

    return parts.filter(Boolean).join(", ");
}

export function getPhoneNumber(contact) {
    if (!contact) return "";
    return contact.country_code + contact.phone_number;
}

export function formatDateRange(start, end, isCurrent) {
    if (!start) return '';

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
    };

    const startStr = formatDate(start);
    const endStr = isCurrent ? 'Present' : formatDate(end);

    return `${startStr} - ${endStr}`;
}