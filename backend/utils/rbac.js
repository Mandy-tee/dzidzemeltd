export const permissions = [
    {
        role: "user",
        actions: [
            "get_profile",
        ]
    },
    {
        role: "admin",
        actions: [
            "get_profile",
            "get_users",
            "get_user",
            "post_category",
            "put_category",
            "post_product",
            "put_product",
        ]
    },
    {
        role: "superadmin",
        actions: [
            "get_profile",
            "post_user",
            "get_users",
            "get_user",
            "put_user",
            "post_category",
            "put_category",
            "delete_category",
            "post_product",
            "put_product",
            "delete_product",
        ]
    },
]