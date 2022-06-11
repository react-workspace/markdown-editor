import Dexie from 'dexie'

//データの型定義
export interface MemoRecord{
	datetime: string
	title: string
	text:string
}

//Dexieのインスタンス作成
const database = new Dexie('markdown-editor')

database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
	const datetime = new Date().toISOString() //indexedDB保存処理
	await memos.put({ datetime, title, text })
}