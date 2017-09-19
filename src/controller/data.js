/**
 * 데이터 저장 코드
 */
 var DataCode = {
     // 아무일도 하지 않음 또는 소스 코드 오류
     NotWork: 0,
     // 성공
     Success: 1,
     // 실패
     Fail: 2,
     // 데이터 충돌
     Crash: 3
 };

/**
 * 데이터 저장용 리턴 데이터 형식
 */
function webStorageData(key, data, code, exception){
    this.key = key;
    this.data = data;
    this.code = DataCode.NotWork;
    this.exception = '';
}; 

/**
 * 데이터 저장용 처리기
 * 
 * 웹 스토리지용 저장/읽기/쓰기/삭제 기능을 수행함
 * Key/Value 조합으로 모든걸 수행함
 */
var WebStorageController = {
    /**
     * key에 해당하는 데이터를 추가
     * 만약 충돌하는 경우 에러 메시지 반환
     */
    write: function(key, value){
        if(!value){
            message('Error: No value specified!');
            return;
        }
        chrome.storage.sync.set({key:value},function(){
            message('Value saved');
        });
        return new webStorageData(key, 'WRITE', DataCode.Success);
    },
    /**
     * key에 해당하는 데이터를 찾아 반환
     */
    read: function(key){
        return new webStorageData(key, 'READ', DataCode.Success);
    },
    /**
     * key에 해당하는 데이터를 찾아 기존 데이터를 덮어 수정 함
     */
    modify: function(key, value){
        return new webStorageData(key, 'MODIFY', DataCode.Success);
    },
    /**
     * key에 해당하는 key/value 데이터를 삭제
     */
    delete: function(key, value){
        return new webStorageData(key, value, DataCode.Success);
    }
};