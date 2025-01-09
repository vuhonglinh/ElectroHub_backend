
export function createSlug(input: string): string {
    const search = [
        /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
        /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,
        /ì|í|ị|ỉ|ĩ/g,
        /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
        /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,
        /ỳ|ý|ỵ|ỷ|ỹ/g,
        /đ/g,
        /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
        /È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g,
        /Ì|Í|Ị|Ỉ|Ĩ/g,
        /Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
        /Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g,
        /Ỳ|Ý|Ỵ|Ỷ|Ỹ/g,
        /Đ/g,
        /[^a-zA-Z0-9\-_\s]/g,
    ];
    const replace = [
        'a',
        'e',
        'i',
        'o',
        'u',
        'y',
        'd',
        'A',
        'E',
        'I',
        'O',
        'U',
        'Y',
        'D',
        '-',
    ];

    let slug = input;

    search.forEach((pattern, index) => {
        slug = slug.replace(pattern, replace[index]);
    });
    slug = slug.replace(/[\s\-]+/g, '-');
    slug = slug.toLowerCase();
    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
}