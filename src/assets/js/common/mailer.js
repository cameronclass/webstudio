$(document).ready(function () {

    $('#form-result-mail').submit(function (e) {
        e.preventDefault();
        const responseBlock = $(document).find('#email-response');
        const formData = new FormData();
        const $form = $(this)
        const method = $(this).attr('method');
        const action = $(this).attr('action');
        const email = $form.find('input[name=email]').val().trim();
        const phone = $form.find('input[name=phone]').val().trim();
        const content = $form.find('textarea[name=content]').val().trim();
        const name = $form.find('input[name=name]').val().trim();
        if (name.length > 0 && email.length > 0 && phone.length > 0 && content.length > 0 ) {
            formData.append('name', name)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('content', content)

            let filesElement = $form.find('#upload-file__input_1')
            if (filesElement) {
                const files = filesElement[0].files;
                if (files.length > 0)
                    for (let i = 0; i < files.length; i++)
                        formData.append('file[]', files[i])
            }
            responseBlock.text('')
            $.ajax({
                url: action,
                type: method.toUpperCase(),
                contentType: false,
                data: formData,
                processData: false,
                async: true,
                cache: false
            }).done(function (msg) {
                const result = JSON.parse(msg)
                if (!responseBlock.length)
                    $form.find('[data-response]').after().append(`<div id="email-response">${result.status}</div>`);
                responseBlock.text(result.status);
            }).fail(function (error) {
                console.error(error)
            })
        } else
            if (!responseBlock.length)
                 $form.find('[data-response]').after().append('<div id="email-response">Пожалуйста заполните все поля</div>')

    })
});