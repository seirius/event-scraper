export interface WegowEvent {
    id: string;
    attendence: number;
    city: {
        id: number;
        name: string;
        administrative_division: string;
        country: string;
        iso_code: string;
        index: boolean;
        timezone: string;
    };
    curated: boolean;
    image_url?: string;
    price: string;
    currency: string;
    start_date: string;
    end_date: string;
    show_time: boolean;
    slug: string;
    enabled: boolean;
    permalink: string;
    image_average_color: {
        r: number;
        g: number;
        b: number;
    };
    title: string;
    type: number;
    user: {
        going: boolean;
        tracking: boolean;
    };
    venue: {
        id: number;
        name: string;
        image_url?: string;
        permalink: string;
        longitude: number;
        latitude: number;
        thumbnails?: string[];
    };
    followers_count: number;
    tickets_count?: number;
    qr_url?: string;
    modified: string;
    created: string;
    ticket_types_count: number;
    thumbnails?: string[];
    has_options: boolean;
    has_sales: boolean;
    purchase_url: string;
    cancelation_status: number;
}