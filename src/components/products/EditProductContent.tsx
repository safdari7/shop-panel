import React, { useState, useEffect } from 'react'
import Content from '../partials/Content'
import {
  FormControl, TextField, InputLabel, Select, MenuItem, Grid, Typography, Divider, Button, ButtonGroup, LinearProgress, Dialog, DialogTitle, DialogContent, FormLabel, RadioGroup, Radio, FormControlLabel, DialogActions
} from '@material-ui/core'
import Section from '../partials/Section'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ImageInput from '../partials/ImageInput'
import HttpClient from '../../services/Http'
import { debounce } from 'lodash'
import { v4 as uuidV4 } from 'uuid'
import { Variation } from './variations/Variation'
import Color from './variations/Color'
import DropDown from './variations/DropDown'
import VariantSelect from './variations/VariantSelect'
import * as validator from './ProductValidator'

const useStyles = makeStyles((theme: Theme) => createStyles({
  formRow: {
    margin: theme.spacing(2, 'auto')
  },
  product_details: {
    border: '1px solid #DDD',
    padding: theme.spacing(2)
  },
  category: {
    maxWidth: 200
  }
}))

interface CategoryItem {
  id: string;
  title: string;
  slug: string;
}

interface AttributeItem {
  hash: string
  title: string
  slug: string
  filterable: boolean
  hasPrice: boolean,
  value: string
}

interface ProductAttributes {
  title: string;
  attributes: AttributeItem[]
}

interface PriceVariation {
  [index: string]: string
}

interface PriceVariationItem {
  items: PriceVariation
  price: number
}

export default function EditProductContent () {
  const styles = useStyles()
  const api = new HttpClient()

  const [variationDialog, setVariationDialog] = useState<boolean>(false)
  const [newVariationTitle, setNewVariationTitle] = useState<string>('')
  const [newVariationName, setNewVariationName] = useState<string>('')
  const [newVariationType, setNewVariationType] = useState<string>('')

  const [priceVariantDialog, setPriceVariantDialog] = useState<boolean>(false)
  const [priceVariantAmount, setPriceVariantAmount] = useState<number>(0)
  const [priceVariations, setPriceVariations] = useState<PriceVariationItem[]>([])

  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [discountedPrice, setDiscountedPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [gallery, setGallery] = useState<File[]>([])
  const [progress, setProgress] = useState<number>(0)

  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const [productAttributes, setProductAttributes] = useState<ProductAttributes[]>([])

  const [variations, setVariations] = useState<Variation[]>([])
  const [priceVariation, setPriceVariation] = useState<PriceVariation>()

  const [errorBag, setErrorBag] = useState<Map<string, string>>(new Map<string, string>())

  useEffect(() => {
    api.get<CategoryItem[]>('/api/v1/admin/categories').then(response => {
      setCategories(response.data)
    }).catch(error => {
      // TODO replace this error with another handler
      console.log(error.message)
    })
  }, [])

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validator.validateTitle(e.target.value)
    if (result) {
      setErrorBag(errorBag.set('title', result))
    } else {
      errorBag.delete('title')
      setErrorBag(errorBag)
    }
    setTitle(e.target.value)
  }

  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validator.validatePrice(e.target.value)
    if (result) {
      setErrorBag(errorBag.set('price', result))
    } else {
      errorBag.delete('price')
      setErrorBag(errorBag)
    }
    setPrice(e.target.value as unknown as number)
  }

  const updateDiscountedPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountedPrice(e.target.value as unknown as number)
  }

  const updateStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock(e.target.value as unknown as number)
  }

  const updateCategory = (e: React.ChangeEvent<{ value: unknown }>) => {
    const categoryID = e.target.value as string
    if (categoryID) {
      setSelectedCategory(categoryID)
      api.get<ProductAttributes[]>(`/api/v1/admin/categories/${categoryID}/attributes`)
        .then(response => setProductAttributes(response.data))
        .catch(error => console.log(error))
    }
  }

  const updateAttributeByHash = debounce((hash: string, value: string) => {
    setProductAttributes(productAttributes.map((group: ProductAttributes) => {
      const newAttributes = group.attributes.map((attribute: AttributeItem) => {
        if (attribute.hash === hash) {
          return { ...attribute, value }
        }
        return attribute
      })
      group.attributes = newAttributes
      return group
    }))
  }, 1000)

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>, hash: string) => {
    updateAttributeByHash(hash, e.target.value)
  }

  const updateThumbnail = (file: File) => {
    setThumbnail(file)
  }

  const updateGallery = (file: File) => {
    setGallery((prev: File[]) => {
      return [...prev, file]
    })
  }

  const showVariationDialog = (e: React.MouseEvent) => {
    setVariationDialog(true)
  }

  const addVariation = (e: React.MouseEvent) => {
    setVariations(prev => {
      return [
        ...prev,
        {
          hash: uuidV4(),
          name: newVariationName,
          title: newVariationTitle,
          type: newVariationType,
          items: []
        }
      ]
    })
    setVariationDialog(false)
  }

  const addVariantItem = (hash: string, title: string, value: string) => {
    setVariations(variations.map((variation: Variation) => {
      if (variation.hash === hash) {
        return {
          ...variation,
          items: [...variation.items, {
            title,
            value
          }]
        }
      }
      return variation
    }))
  }

  const addPriceVariant = (e: React.MouseEvent) => {
    setPriceVariations(prev => ([...prev, { items: priceVariation as PriceVariation, price: priceVariantAmount }]))
    setPriceVariantDialog(false)
  }

  const addPriceVariantItem = (name: string, value: string) => {
    setPriceVariation(prev => ({ ...prev, [name]: value }))
  }

  const saveProduct = (e: React.MouseEvent) => {
    e.preventDefault()

    const form = new FormData()
    form.append('title', title)
    form.append('price', price as unknown as string)
    form.append('discountedPrice', discountedPrice as unknown as string)
    form.append('stock', stock as unknown as string)
    form.append('thumbnail', thumbnail as Blob)
    form.append('category', selectedCategory)
    gallery.forEach((file: File) => {
      form.append('gallery[]', file as Blob)
    })

    form.append('attributes', JSON.stringify(productAttributes))
    form.append('product_variations', JSON.stringify(variations))
    form.append('price_variations', JSON.stringify(priceVariations))

    api.post('/api/v1/admin/products', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percent as number)
      }
    })
      .then(response => { console.log(response) })
      .catch(error => {
        // TODO replace with error handler
        console.log(error)
      })
  }

  return (
    <Content title="???????????? / ?????????? ???????? ??????????">

      {/* ???????????? ???????????? ?????????? */}
      <Dialog open={variationDialog}>

        <DialogTitle>
          ?????????? ???????? ???????????? ?????????? ????????
        </DialogTitle>

        <DialogContent>

          <FormControl fullWidth className={styles.formRow}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVariationTitle(e.target.value)}
              variant="outlined"
              id="variation_title"
              name="variation_title"
              label="?????????? ???????????? ??????????"
            />
          </FormControl >

          <FormControl fullWidth className={styles.formRow}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVariationName(e.target.value)}
              variant="outlined"
              id="variation_name"
              name="variation_name"
              label="?????? ???????????? ??????????"
              placeholder="???????? color,size,material"
            />
          </FormControl >

          <FormControl component="fieldset">

            <FormLabel component="legend">
              ?????? ???????????? ?????????? :
            </FormLabel>

            <RadioGroup
              aria-label="variation_type"
              name="variation_type"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVariationType(e.target.value)}
            >

              <FormControlLabel value="color" control={<Radio />} label="??????" />
              <FormControlLabel value="dropdown" control={<Radio />} label="???????? ??????????" />

            </RadioGroup>

          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={() => { setVariationDialog(false) }}>
            ??????
          </Button>
          <Button color="primary" onClick={addVariation}>
            ??????????
          </Button>
        </DialogActions>

      </Dialog>

      {/* ????????????  ???????? ???????????? ?????????? */}
      <Dialog open={priceVariantDialog}>

        <DialogTitle>
          ???????? ???????????? ??????????
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth className={styles.formRow}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceVariantAmount(e.target.value as unknown as number)}
              variant="outlined"
              id="price_variant"
              name="price_variant"
              label="???????? ???????????? ??????????"
            />
          </FormControl >
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setPriceVariantDialog(false) }} color="primary">
            ??????
          </Button>
          <Button onClick={addPriceVariant} color="primary">
            ??????????
          </Button>
        </DialogActions>

      </Dialog>

      <LinearProgress variant="determinate" value={progress} style={{ marginBottom: '10px' }} />

      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={updateTitle}
          error={errorBag.has('title')}
          helperText={errorBag.has('title') && errorBag.get('title')}
          variant="outlined"
          id="title"
          name="title"
          label="?????????? ??????????"
        />
      </FormControl >

      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={updatePrice}
          error={errorBag.has('price')}
          helperText={errorBag.has('price') && errorBag.get('price')}
          variant="outlined"
          id="price"
          name="price"
          label="???????? ???? ????????"
        />
      </FormControl>

      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={updateDiscountedPrice}
          error={errorBag.has('discounted_price')}
          helperText={errorBag.has('discounted_price') && errorBag.get('discounted_price')}
          variant="outlined"
          id="discounted_price"
          name="discounted_price"
          label="???????? ???????? ???? ????????"
          defaultValue={0}
        />
      </FormControl>

      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={updateStock}
          variant="outlined"
          id="stock"
          name="stock"
          label="????????????"
          defaultValue={0}
        />
      </FormControl>

      {/* ???????????? ???????? ???????? */}
      <Grid item xs={6}>
        <FormControl fullWidth className={styles.formRow} >

          <InputLabel id="category_label">
            ???????? ????????
          </InputLabel>

          <Select
            labelId="category_label"
            id="category_label"
            onChange={updateCategory}
          >

            <MenuItem value={0}>???????? ???????? ???? ???????????? ????????</MenuItem>

            {
              categories.map((category: CategoryItem) => (
                <MenuItem key={category.id} value={category.id} >
                  {category.title}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Section title="?????????? ????????">
        <ImageInput onChange={updateThumbnail} />
      </Section>

      <Section title="?????????? ????????????">
        <Grid container>
          <Grid item xs={12} md={4}><ImageInput onChange={updateGallery} /></Grid>
          <Grid item xs={12} md={4}><ImageInput onChange={updateGallery} /></Grid>
          <Grid item xs={12} md={4}><ImageInput onChange={updateGallery} /></Grid>
        </Grid>
      </Section>

      <Section title="???????????? ??????????">
        {
          productAttributes.map((group: ProductAttributes) => {
            return (
              <>
                <Typography variant="h6">
                  {group.title}
                </Typography>

                <Divider />

                {
                  group.attributes.map((attribute: AttributeItem) => (
                    <>
                      <FormControl fullWidth className={styles.formRow}>
                        <TextField
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleAttributeChange(e, attribute.hash) }}
                          variant="outlined"
                          label={attribute.title} />
                      </FormControl >
                    </>
                  )
                  )
                }
              </>
            )
          })
        }
      </Section>

      <Section title="?????????????????? ??????????">
        {
          variations.map((variation: Variation) => {
            if (variation.type === 'color') {
              return (
                <Color
                  key={variation.hash}
                  hash={variation.hash}
                  title={variation.title}
                  items={variation.items}
                  onAddColor={addVariantItem}
                />
              )
            }
            return (
              <DropDown
                key={variation.hash}
                hash={variation.hash}
                title={variation.title}
                items={variation.items}
                onItemAdded={addVariantItem}
              />
            )
          })
        }

        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={showVariationDialog}>
            ?????????? ???????? ???????????? ??????????
          </Button>
        </ButtonGroup>

      </Section>

      {
        variations.length > 0 &&
        <Section title=" ?????????????????? ????????">
          {
            variations.map((variant: Variation) => (
              <VariantSelect
                key={variant.hash}
                name={variant.name}
                title={variant.title}
                items={variant.items}
                onItemsChanged={addPriceVariantItem}
              />
            ))
          }

          <FormControl fullWidth className={styles.formRow}>
            <Button variant="contained" color="primary" onClick={() => { setPriceVariantDialog(true) }}>
              ?????????? ???????????? ????????
            </Button>
          </FormControl >

        </Section>
      }

      <FormControl fullWidth className={styles.formRow}>
        <Button variant="contained" color="primary" disabled={errorBag.size > 0} onClick={saveProduct}>
          ?????????? ??????????
        </Button>
      </FormControl >

    </Content>
  )
}
