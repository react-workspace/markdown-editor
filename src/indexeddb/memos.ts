import Dexie from 'dexie'

//データの型定義
export interface MemoRecord {
	datetime: string
	title: string
	text: string
}

//Dexieのインスタンス作成
const database = new Dexie('markdown-editor')

database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
	const datetime = new Date().toISOString() //indexedDB保存処理
	await memos.put({ datetime, title, text })
}

const NUM_PER_PAGE: number = 10; //1ページあたり１０件

export const getMemoPageCount = async():Promise<number> => {
	const totalCount = await memos.count()
	const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)//トータルから１ページの件数でわる（ページ数を出す）
	return pageCount > 0 ? pageCount : 1 //0件でも１ページとしてカウント
}

export const getMemos = (page: number): Promise<MemoRecord[]> => {
	const offset = (page - 1) * NUM_PER_PAGE
	return memos.orderBy('datetime')//日時の古い順で取得
		.reverse()//逆にする（新しい順にする）
		.offset(offset)//取得するリスト内の開始位置
		.limit(NUM_PER_PAGE)//取得する件数
		.toArray()//配列に変換して返却
}