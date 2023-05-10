import { GetStaticProps, NextPage } from 'next'

import { GenreService } from '@/services/genre.service'

import Collection from '@/screen/collections/Collection'
import { ICollection } from '@/screen/collections/collection.interface'

const CollectionsPage: NextPage<{ collections: ICollection[] }> = ({
  collections,
}) => {
  return <Collection collections={collections || []} />
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: collections } = await GenreService.getCollections()

    return {
      props: { collections },
      revalidate: 60,
    }
  } catch (error) {
    return { notFound: error, props: {} }
  }
}

export default CollectionsPage
