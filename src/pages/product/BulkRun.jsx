// Stub: the original /bulk-run carries only the closing CTA band between header and footer.
import { ClosingCTA } from '../../components/product/lib'
import { bulkRunCTA } from '../../content/product'

export default function BulkRun() {
  return <ClosingCTA copy={bulkRunCTA} palette="sales" coins={[{ icon: 'table' }, { avatar: 6 }, { icon: 'bolt' }, { avatar: 11 }, { icon: 'grid' }, { avatar: 2 }]} />
}
