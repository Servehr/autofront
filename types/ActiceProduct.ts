type ActiveProduct = 
{
    tb_id: number,
    user_id: number,
    title: string,
    face_image: string,
    slug: string,
    description: string,
    price: number,
    min_price: number | null,
    max_price: number | null,
    chasis_no: string | null,
    mileage: string | null,
    year: string,
    address: string,
    views: number,
    water_mark: string,
    category_id: number,
    category_name: string,
    hash: string,
    country: string,
    state: string,
    manufacturer: string,
    model: string,
    trim: string,
    colour: string,
    condition: string,
    transmission: string
    engine: string,
    firstname: string,
    middlename: string | null,
    surname: string,
    phone: string,
    email: string,
    images: string[],
    images_count?: number, 
    comments_count?: number,
    comments:  { comments: string }[] 
}
