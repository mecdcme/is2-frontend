<template>
  <CCard>
    <CCardHeader>
      Upload files
    </CCardHeader>
    <CCardBody>
      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>
      <CDataTable
        :items="files"
        :fields="fields"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
      >
        <template #show_edit="{item}">
          <td>
            <router-link
              tag="a"
              :to="{
                name: 'AppRoleEdit',
                params: { id: item.id }
              }"
            >
              <edit-icon />
            </router-link>
          </td>
        </template>
        <template #show_upload="{item}">
          <td>
            <span class="icon-link" @click="modalOpen(item)"
              ><delete-icon
            /></span>
          </td>
        </template>
        <template #show_delete="{item}">
          <td>
            <span class="icon-link" @click="modalOpen(item)"
              ><delete-icon
            /></span>
          </td>
        </template>
        <template #no-items-view>
          <div class="text-center p-3">
            <h4>Drag files anywhere to upload<br />or</h4>
            <label for="file" class="btn btn-square btn-sm btn-primary"
              >Select Files</label
            >
          </div>
        </template>
      </CDataTable>
    </CCardBody>
    <CCardFooter>
      <div class="upload">
        <file-upload
          class="btn btn-square btn-sm btn-primary mr-2"
          post-action="/upload/post"
          :multiple="true"
          :drop="true"
          :drop-directory="true"
          v-model="files"
          ref="upload"
        >
          <!-- @input-file="inputFile" -->
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <CButton
          shape="square"
          size="sm"
          color="success"
          v-if="!$refs.upload || !$refs.upload.active"
          @click.prevent="$refs.upload.active = true"
        >
          Start Upload
        </CButton>
        <button
          type="button"
          class="btn btn-danger"
          v-else
          @click.prevent="$refs.upload.active = false"
        >
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import FileUpload from "vue-upload-component";
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      files: [],
      fields: [
        { key: "name", _style: "width:15%" },
        { key: "size", _style: "width:15%;" },
        { key: "error", _style: "width:20%;" },
        {
          key: "show_edit",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        },
        {
          key: "show_upload",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        },
        {
          key: "show_delete",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  methods: {
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // Add file
      }

      if (newFile && oldFile) {
        // Update file

        // Start upload
        if (newFile.active !== oldFile.active) {
          console.log("Start upload", newFile.active, newFile);

          // min size
          if (newFile.size >= 0 && newFile.size < 100 * 1024) {
            newFile = this.$refs.upload.update(newFile, { error: "size" });
          }
        }

        // Upload progress
        if (newFile.progress !== oldFile.progress) {
          console.log("progress", newFile.progress, newFile);
        }

        // Upload error
        if (newFile.error !== oldFile.error) {
          console.log("error", newFile.error, newFile);
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
          console.log("success", newFile.success, newFile);
        }
      }

      if (!newFile && oldFile) {
        // Remove file

        // Automatically delete files on the server
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/file/delete?id=' + oldFile.response.id,
          // });
        }
      }

      // Automatic upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    }
  }
};
</script>

<style>
.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}

.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}

.drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
