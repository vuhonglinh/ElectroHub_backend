import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { createSlug } from 'src/lib';

// Product Entity
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sku: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    sub_description: string;

    @Column()
    status: boolean;

    @Column()
    simple: boolean;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    width: number;

    @Column({ nullable: true })
    weight: number;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    length: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ nullable: false })
    category_id: number;

    // @ManyToOne(() => Category)
    // @JoinColumn({ name: 'category_id' })
    // category: Category;

    @Column({ nullable: true })
    parent_id: number;

    @ManyToOne(() => Product, (product) => product.productVariants, { nullable: true })
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    parent: Product;

    @OneToMany(() => Product, (product) => product.parent)
    productVariants: Product[];

    @OneToMany(() => ProductImage, (productImage) => productImage.product)
    productImages: ProductImage[];

    // Many-to-Many relationship with Attribute
    // @ManyToMany(() => Attribute)
    // @JoinTable({
    //     name: 'attribute_products',
    //     joinColumn: {
    //         name: 'product_id',
    //         referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //         name: 'attribute_id',
    //         referencedColumnName: 'id',
    //     }
    // })
    // attributes: Attribute[];

    @BeforeInsert()
    generateSlug() {
        this.slug = createSlug(this.name);
    }
}

// ProductImage Entity
@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, (product) => product.productImages)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}

// Attribute Entity
@Entity('attributes')
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['text', 'number', 'select'],
        default: 'text',
    })
    type: 'text' | 'number' | 'select';
}

// AttributeValue Entity
@Entity('attribute_values')
export class AttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column()
    attribute_id: number;

    @ManyToOne(() => Attribute)
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;
}

// AttributeProduct Entity (Join Table for Product-Attribute relationship)
@Entity('attribute_products')
export class AttributeProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_id: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    attribute_id: number;

    @ManyToOne(() => Attribute)
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;
}

// ProductAttributeValue Entity (Mapping between Product and AttributeValue)
@Entity('product_attribute_values')
export class ProductAttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    attribute_value_id: number;

    @ManyToOne(() => AttributeValue, (attributeValue) => attributeValue.id)
    @JoinColumn({ name: 'attribute_value_id' })
    attributeValue: AttributeValue;
}

// Resource Definitions for Product and Product Variant
export const ProductResource = {
    id: true,
    name: true,
    sku: true,
    slug: true,
    description: true,
    sub_description: true,
    status: true,
    simple: true,
    price: true,
    quantity: true,
    width: true,
    weight: true,
    height: true,
    length: true,
    created_at: true,
    updated_at: true,
    category_id: true,
    parent_id: true,
}

export const ProductVariantResource = {
    id: true,
    name: true,
    // attributes: {
    //     id: true,
    //     name: true,
    //     type: true,
    // },
    sku: true,
    slug: true,
    sub_description: true,
    status: true,
    price: true,
    quantity: true,
    width: true,
    weight: true,
    height: true,
    length: true,
    created_at: true,
    updated_at: true,
}



