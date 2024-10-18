function setupFileUpload(formId, uploadUrl) {
    const uploadForm = document.getElementById(formId);
    const fileInput = uploadForm.querySelector('input[type="file"]');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');

    const allowedExtensions = new Set([
        'txt', 'sql', 'html', 'xml', 'css', 'py', 'js', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'xls', 'xlsx', 'csv', 
        'ppt', 'pptx', 'zip', 'rar', 'mp3', 'wav', 'aac', 'ogg', 'flac',
        'mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'exe', 'cfg', 'ini', 'jar'
    ]);

    fileInput.addEventListener('change', function() {
        const files = fileInput.files;
        for (const file of files) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.has(fileExtension)) {
                alert('Tipo de arquivo não permitido: ' + file.name);
                fileInput.value = ''; 
                break; 
            }
        }
    });

    uploadForm.addEventListener('submit', function(event) {
        if (!fileInput.files.length) {
            event.preventDefault();
            alert('Por favor, selecione ao menos um arquivo antes de enviar.');
            return;
        }

        event.preventDefault(); 

       
        progressContainer.style.display = 'block';

        const formData = new FormData(uploadForm);
        const xhr = new XMLHttpRequest();

        uploadForm.action = '/upload'; 
        xhr.open('POST', uploadForm.action, true);

        xhr.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressBar.style.width = percentComplete + '%';
                progressBar.textContent = Math.round(percentComplete) + '%';
            }
        });

        xhr.onload = function() {
            if (xhr.status === 200) {
                alert('Upload concluído com sucesso!');
            } else {
                alert('Ocorreu um erro durante o upload.');
            }
            
            progressContainer.style.display = 'none';
        };

        xhr.onerror = function() {
            alert('Erro na solicitação de upload.');
            progressContainer.style.display = 'none';
        };

        xhr.send(formData);
    });
}
