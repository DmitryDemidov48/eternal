import glob from 'fast-glob'
import * as path from 'path'
async function importRetreats(Filename) {
    let { meta, default: component } = await import(
        `../pages/retreat/${Filename}`
        )
    return {
        slug: Filename.replace(/(\/index)?\.mdx$/, ''),
        ...meta,
        component,
    }
}
export async function getAllRetreats() {
    let retreatsFilenames = await glob(['*.mdx'], {
        cwd: path.join(process.cwd(), 'src/pages/retreat'),
    })
    let retreats = await Promise.all(retreatsFilenames.map(importRetreats))
    return retreats.sort((a, z) => new Date(z.date) - new Date(a.date))
}
